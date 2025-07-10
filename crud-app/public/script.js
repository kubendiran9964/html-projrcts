document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const input = document.getElementById('itemInput');
    const list = document.getElementById('itemList');
  
    const fetchItems = async () => {
      const res = await fetch('/api/items');
      const data = await res.json();
      list.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.name}</span>
          <button onclick="editItem(${item.id}, '${item.name}')">Edit</button>
          <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        list.appendChild(li);
      });
    };
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (name) {
        await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        });
        input.value = '';
        fetchItems();
      }
    });
  
    window.editItem = async (id, oldName) => {
      const name = prompt('Edit item:', oldName);
      if (name) {
        await fetch(`/api/items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        });
        fetchItems();
      }
    };
  
    window.deleteItem = async (id) => {
      await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      });
      fetchItems();
    };
  
    fetchItems();
  });
  