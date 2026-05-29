const CARS = {
  ferrari: {
    label: 'Ferrari',
    models: [
      {
        id: 'sf90',
        name: 'SF90 Stradale',
        year: '2020–present',
        hp: '986 hp',
        top: '340 km/h',
        engine: 'V8 Hybrid',
        img: 'stradale.jpg'
      },
      {
        id: 'roma',
        name: 'Roma',   
        year: '2020–present',
        hp: '620 hp',
        top: '320 km/h',
        engine: 'V8 Twin-Turbo',
        img: 'roma1.jpg'
      },
      {
        id: 'f8',
        name: 'F8 Tributo',
        year: '2019–2022',
        hp: '710 hp',
        top: '340 km/h',
        engine: 'V8 Twin-Turbo',
        img: 'image.png'
      }
    ]
  },
  lamborghini: {
    label: 'Lamborghini',
    models: [
      {
        id: 'urus',
        name: 'Urus',
        year: '2018–present',
        hp: '650 hp',
        top: '305 km/h',
        engine: 'V8 Twin-Turbo',
        img: 'urus.jpg'
      },
      {
        id: 'huracan',
        name: 'Huracán EVO',
        year: '2019–present',
        hp: '640 hp',
        top: '325 km/h',
        engine: 'V10 NA',
        img: 'hurican.jpg'
      },
      {
        id: 'revuelto',
        name: 'Revuelto',
        year: '2023–present',
        hp: '1001 hp',
        top: '350 km/h',
        engine: 'V12 Hybrid',
        img: 'revuelto.jpg'
      }
    ]
  },
  bugatti: {
    label: 'Bugatti',
    models: [
      {
        id: 'chiron',
        name: 'Chiron',
        year: '2016–present',
        hp: '1500 hp',
        top: '420 km/h',
        engine: 'W16 Quad-Turbo',
        img: 'chiron.jpg'
      },
      {
        id: 'bolide',
        name: 'Bolide',
        year: '2024–present',
        hp: '1850 hp',
        top: '500 km/h',
        engine: 'W16 Quad-Turbo',
        img: 'bolide.jpg'
      },
      {
        id: 'tourbillon',
        name: 'Tourbillon',
        year: '2026–present',
        hp: '1800 hp',
        top: '445 km/h',
        engine: 'V16 Hybrid',
        img: 'tourbillon.jpg'
      }
    ]
  }
};

let currentBrand = null;

function selectBrand(el) {
  // Highlight selected brand card
  document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  currentBrand = el.dataset.brand;
  const brand = CARS[currentBrand];

  // Build model cards
  const grid = document.getElementById('model-grid');
  grid.innerHTML = '';
  brand.models.forEach(model => {
    const card = document.createElement('button');
    card.className = 'model-card';
    card.dataset.modelId = model.id;
    card.innerHTML = `
      <span class="model-name">${model.name}</span>
      <span class="model-year">${model.year}</span>
    `;
    card.addEventListener('click', () => selectModel(card, model));
    grid.appendChild(card);
  });

  // Show step 2, hide step 3
  showSection('step-model');
  document.getElementById('step-reveal').classList.add('hidden');
}

function selectModel(el, model) {
  // Highlight selected model card
  document.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  // Populate reveal section
  const brand = CARS[currentBrand];
  document.getElementById('car-name').textContent = brand.label + ' ' + model.name;

  document.getElementById('car-stats').innerHTML = `
    <div class="stat">
      <span class="stat-label">Power</span>
      <span class="stat-value">${model.hp}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Top Speed</span>
      <span class="stat-value">${model.top}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Engine</span>
      <span class="stat-value">${model.engine}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Production</span>
      <span class="stat-value" style="font-size:16px; padding-top: 3px;">${model.year}</span>
    </div>
  `;

  // Load image
  const wrap = document.getElementById('car-img-wrap');
  wrap.innerHTML = '<div class="spinner"></div>';

  const img = new Image();
  img.alt = brand.label + ' ' + model.name;
  img.onload = () => {
    wrap.innerHTML = '';
    wrap.appendChild(img);
  };
  img.onerror = () => {
    wrap.innerHTML = '<p class="no-img">Image not available</p>';
  };
  img.src = model.img;

  showSection('step-reveal');
  document.getElementById('step-reveal').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSection(id) {
  const section = document.getElementById(id);
  section.classList.remove('hidden');
  section.classList.remove('fade-in');
  void section.offsetWidth; // force reflow to restart animation
  section.classList.add('fade-in');
}
