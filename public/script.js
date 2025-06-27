window.addEventListener('DOMContentLoaded', () => {
    const h1 = document.getElementById('test');

    fetch('/todos')
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(todos => {
            h1.innerHTML = todos
                .map(todo => `${todo.title}: ${todo.completed}`)
                .join('<br>');
        })
        .catch(err => {
            console.error(err);
            h1.textContent = 'Veri yüklenemedi';
        });
});
