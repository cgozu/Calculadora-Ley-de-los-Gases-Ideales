const API_URL = 'https://inuest.pythonanywhere.com';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const errorDiv = document.getElementById('error');
    const resultSection = document.getElementById('resultSection');
    const historyBody = document.getElementById('historyBody');
    const noHistoryMsg = document.getElementById('noHistory');
    const historyTable = document.getElementById('historyTable');
    const clearHistoryBtn = document.getElementById('clearHistory');

    loadHistory();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideError();

        const pressure = document.getElementById('pressure').value;
        const volume = document.getElementById('volume').value;
        const temperature = document.getElementById('temperature').value;

        if (!pressure || !volume || !temperature) {
            showError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pressure: parseFloat(pressure),
                    volume: parseFloat(volume),
                    temperature: parseFloat(temperature)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                showError(data.error || 'Error en el cálculo');
                return;
            }

            displayResult(data);
            loadHistory();
            
        } catch (error) {
            showError('Error de conexión. Intente nuevamente.');
            console.error('Error:', error);
        }
    });

    clearHistoryBtn.addEventListener('click', async function() {
        if (!confirm('¿Está seguro de que desea eliminar todo el historial?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/history/clear`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadHistory();
            }
        } catch (error) {
            console.error('Error al limpiar historial:', error);
        }
    });

    async function loadHistory() {
        try {
            const response = await fetch(`${API_URL}/history`);
            const history = await response.json();

            historyBody.innerHTML = '';

            if (history.length === 0) {
                noHistoryMsg.style.display = 'block';
                historyTable.style.display = 'none';
                return;
            }

            noHistoryMsg.style.display = 'none';
            historyTable.style.display = 'table';

            history.reverse().forEach((record, index) => {
                const row = document.createElement('tr');
                const date = new Date(record.timestamp);
                const formattedDate = date.toLocaleString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                row.innerHTML = `
                    <td>${history.length - index}</td>
                    <td>${formatNumber(record.pressure)}</td>
                    <td>${formatNumber(record.volume)}</td>
                    <td>${formatNumber(record.temperature_C)}</td>
                    <td>${formatNumber(record.temperature_K)}</td>
                    <td><strong>${record.moles}</strong></td>
                    <td>${formattedDate}</td>
                `;
                historyBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    }

    function displayResult(data) {
        document.getElementById('resultMoles').textContent = data.moles;
        document.getElementById('resultTempK').textContent = data.temperature_K;
        document.getElementById('resultPressure').textContent = formatNumber(data.pressure);
        document.getElementById('resultVolume').textContent = formatNumber(data.volume);
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return num.toExponential(4);
        } else if (num < 0.0001 && num !== 0) {
            return num.toExponential(4);
        }
        return parseFloat(num.toPrecision(6));
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        resultSection.style.display = 'none';
    }

    function hideError() {
        errorDiv.style.display = 'none';
    }
});
