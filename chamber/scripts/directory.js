const directory = document.getElementById('directory');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    directory.innerHTML = `<p role="alert">Failed to load members. ${err.message}</p>`;
  }
}

function renderMembers(members) {
  directory.innerHTML = '';
  members.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'logo';
    img.src = m.logo;
    img.alt = `${m.name} logo`;
    img.width = 64; img.height = 64;

    const content = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = m.name;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `
      <div>${m.address}</div>
      <div><a href="tel:${m.phone.replace(/[^+\d]/g,'')}">${m.phone}</a></div>
      <div><a href="${m.website}" target="_blank" rel="noopener">Visit Website</a></div>
      <div>${m.notes ?? ''}</div>
    `;

    const badge = document.createElement('span');
    const level = Number(m.membershipLevel);
    const label = level === 3 ? 'Gold' : level === 2 ? 'Silver' : 'Member';
    badge.className = `badge ${label.toLowerCase()}`;
    badge.textContent = label;

    content.append(h3, meta, badge);
    card.append(img, content);
    directory.append(card);
  });
}

function setView(mode) {
  directory.classList.toggle('grid', mode === 'grid');
  directory.classList.toggle('list', mode === 'list');

  gridBtn.classList.toggle('active', mode === 'grid');
  listBtn.classList.toggle('active', mode === 'list');

  gridBtn.setAttribute('aria-pressed', String(mode === 'grid'));
  listBtn.setAttribute('aria-pressed', String(mode === 'list'));
}

gridBtn?.addEventListener('click', () => setView('grid'));
listBtn?.addEventListener('click', () => setView('list'));

setView('grid');   // default
loadMembers();
