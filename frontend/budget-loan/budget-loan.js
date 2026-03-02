/* Budget & Loan Page JS */
document.addEventListener('DOMContentLoaded', () => {
    setupEMICalculator();
    setupEligibility();
});

function setupEMICalculator() {
    const amount = document.getElementById('emi-amount');
    const tenure = document.getElementById('emi-tenure');
    const rate = document.getElementById('emi-rate');

    const update = () => {
        const P = Number(amount.value);
        const years = Number(tenure.value);
        const R = Number(rate.value) / 12 / 100;
        const N = years * 12;

        document.getElementById('emi-amount-val').textContent = `\u20B9${Number(P).toLocaleString('en-IN')}`;
        document.getElementById('emi-tenure-val').textContent = `${years} year${years > 1 ? 's' : ''}`;
        document.getElementById('emi-rate-val').textContent = `${rate.value}%`;

        const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
        const totalPayable = emi * N;
        const totalInterest = totalPayable - P;

        document.getElementById('emi-monthly').textContent = `\u20B9${Math.round(emi).toLocaleString('en-IN')}`;
        document.getElementById('emi-total').textContent = `\u20B9${Math.round(totalPayable).toLocaleString('en-IN')}`;
        document.getElementById('emi-interest').textContent = `\u20B9${Math.round(totalInterest).toLocaleString('en-IN')}`;

        // Risk assessment
        const emiToLoanRatio = (emi * 12) / P;
        const riskFill = document.getElementById('risk-fill');
        const riskText = document.getElementById('risk-text');

        riskFill.className = 'risk-fill';
        if (emiToLoanRatio > 0.35) {
            riskFill.style.width = '90%';
            riskFill.classList.add('high');
            riskText.textContent = '\u26A0 High Risk \u2014 EMI is very high relative to loan amount. Consider longer tenure.';
            riskText.style.color = 'var(--danger)';
        } else if (emiToLoanRatio > 0.2) {
            riskFill.style.width = '55%';
            riskFill.classList.add('moderate');
            riskText.textContent = '\u26A0 Moderate \u2014 EMI is manageable but consider your income before proceeding.';
            riskText.style.color = 'var(--warning)';
        } else {
            riskFill.style.width = '25%';
            riskFill.classList.add('safe');
            riskText.textContent = '\u2713 Safe \u2014 Your EMI is within a comfortable range. Good to proceed!';
            riskText.style.color = 'var(--success)';
        }
    };

    amount.addEventListener('input', update);
    tenure.addEventListener('input', update);
    rate.addEventListener('input', update);
    update();
}

function setupEligibility() {
    document.getElementById('check-eligibility').addEventListener('click', async () => {
        const income = document.getElementById('el-income').value;
        const amount = document.getElementById('el-amount').value;
        const existingEMI = document.getElementById('el-existing').value || 0;

        if (!income || !amount) { alert('Please fill in income and loan amount.'); return; }

        const resultDiv = document.getElementById('eligibility-result');
        try {
            const res = await apiFetch('/loans/eligibility', {
                method: 'POST',
                body: JSON.stringify({ annualIncome: income, loanAmount: amount, existingEMI })
            });
            const d = res.data;
            resultDiv.style.display = 'block';
            resultDiv.className = `eligibility-result ${d.eligible ? 'eligible' : 'not-eligible'}`;
            resultDiv.innerHTML = `
        <h3>${d.eligible ? '&#10003; You Are Eligible!' : '&#10007; Not Eligible'}</h3>
        <p>${d.message}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
          <div><span style="font-size:0.78rem;color:var(--text-muted)">Max Loan Eligible</span><br><strong>\u20B9${Number(d.maxLoanAmount).toLocaleString('en-IN')}</strong></div>
          <div><span style="font-size:0.78rem;color:var(--text-muted)">Max EMI Capacity</span><br><strong>\u20B9${Number(d.maxEMI).toLocaleString('en-IN')}/mo</strong></div>
        </div>
      `;
        } catch (e) {
            // Fallback client-side calculation
            const monthlyIncome = Number(income) / 12;
            const maxEMI = monthlyIncome * 0.5 - Number(existingEMI);
            const R = 8.5 / 12 / 100;
            const N = 84;
            const maxLoan = maxEMI * (Math.pow(1 + R, N) - 1) / (R * Math.pow(1 + R, N));
            const eligible = maxLoan >= Number(amount);

            resultDiv.style.display = 'block';
            resultDiv.className = `eligibility-result ${eligible ? 'eligible' : 'not-eligible'}`;
            resultDiv.innerHTML = `
        <h3>${eligible ? '&#10003; You Are Eligible!' : '&#10007; Not Eligible for this Amount'}</h3>
        <p>Max eligible loan: \u20B9${Math.round(maxLoan).toLocaleString('en-IN')}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
          <div><span style="font-size:0.78rem;color:var(--text-muted)">Max Loan Eligible</span><br><strong>\u20B9${Math.round(maxLoan).toLocaleString('en-IN')}</strong></div>
          <div><span style="font-size:0.78rem;color:var(--text-muted)">Max EMI Capacity</span><br><strong>\u20B9${Math.round(maxEMI).toLocaleString('en-IN')}/mo</strong></div>
        </div>
      `;
        }
    });
}
