// بيانات السيارات (Mock Data)
const cars = [
    {
        id: 1,
        title: "Porsche 911 GT3 RS",
        price: 240000,
        year: 2023,
        mileage: "2,500 كم",
        engine: "4.0L Flat-6",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "BMW M4 Competition",
        price: 82000,
        year: 2022,
        mileage: "12,000 كم",
        engine: "3.0L Twin-Turbo",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Mercedes-AMG GT",
        price: 118000,
        year: 2021,
        mileage: "18,500 كم",
        engine: "4.0L V8 Biturbo",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    }
];

let favorites = [];

// التنقل بين الصفحات
function showSection(sectionName) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('inventory-section').classList.add('hidden');
    document.getElementById('favorites-section').classList.add('hidden');

    if (sectionName === 'home') {
        document.getElementById('home-section').classList.remove('hidden');
    } else if (sectionName === 'inventory') {
        document.getElementById('inventory-section').classList.remove('hidden');
        renderCars(cars);
    } else if (sectionName === 'favorites') {
        document.getElementById('favorites-section').classList.remove('hidden');
        renderFavorites();
    }
}

// عرض قائمة السيارات
function renderCars(carList) {
    const grid = document.getElementById('carsGrid');
    grid.innerHTML = '';

    if (carList.length === 0) {
        grid.innerHTML = '<p class="text-gray-400 text-lg">لا توجد نتائج تطابق بحثك.</p>';
        return;
    }

    carList.forEach(car => {
        const isFav = favorites.includes(car.id);
        const carCard = `
            <div class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:border-blue-500 transition">
                <img src="${car.image}" alt="${car.title}" class="w-full h-48 object-cover">
                <div class="p-5">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xl font-bold">${car.title}</h3>
                        <button onclick="toggleFavorite(${car.id})" class="text-2xl">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <p class="text-blue-400 text-xl font-bold mb-4">$${car.price.toLocaleString()}</p>
                    <div class="text-sm text-gray-400 space-y-1 mb-4">
                        <p>🗓️ السنة: ${car.year}</p>
                        <p>🛣️ الممشى: ${car.mileage}</p>
                        <p>⚙️ المحرك: ${car.engine}</p>
                    </div>
                    <button class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition">التفاصيل / التواصل</button>
                </div>
            </div>
        `;
        grid.innerHTML += carCard;
    });
}

// إضافة أو حذف من المفضلة
function toggleFavorite(carId) {
    if (favorites.includes(carId)) {
        favorites = favorites.filter(id => id !== carId);
    } else {
        favorites.push(carId);
    }
    renderCars(cars);
    renderFavorites();
}

// عرض السيارات المفضلة
function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    grid.innerHTML = '';

    const favCars = cars.filter(car => favorites.includes(car.id));

    if (favCars.length === 0) {
        grid.innerHTML = '<p class="text-gray-400 text-lg">لم تقم بإضافة أي سيارة للمفضلة بعد.</p>';
        return;
    }

    favCars.forEach(car => {
        const carCard = `
            <div class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                <img src="${car.image}" alt="${car.title}" class="w-full h-48 object-cover">
                <div class="p-5">
                    <h3 class="text-xl font-bold mb-2">${car.title}</h3>
                    <p class="text-blue-400 text-xl font-bold mb-4">$${car.price.toLocaleString()}</p>
                    <button onclick="toggleFavorite(${car.id})" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg transition">إزالة من المفضلة</button>
                </div>
            </div>
        `;
        grid.innerHTML += carCard;
    });
}

// البحث
function filterCars() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = cars.filter(car => car.title.toLowerCase().includes(query));
    renderCars(filtered);
}