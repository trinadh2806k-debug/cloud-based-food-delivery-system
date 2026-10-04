// MENU DATA WITH INR (₹) PRICING
        const MENU_DATA = [
            { 
                id: "ind-1", 
                name: "Butter Chicken & Garlic Butter Naan", 
                category: "indian", 
                kitchen: "Vedic Cloud Kitchen #DELHI", 
                price: 450, 
                desc: "Slow-cooked tandoori chicken in rich tomato butter sauce served with garlic naan.", 
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: "ind-2", 
                name: "Royal Hyderabadi Dum Biryani", 
                category: "indian", 
                kitchen: "Nizam Spice Cloud Hub", 
                price: 480, 
                desc: "Fragrant basmati rice layered with spiced marinated chicken, saffron, mint & raita.", 
                image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: "ind-3", 
                name: "Paneer Tikka Masala & Paratha", 
                category: "indian", 
                kitchen: "Vedic Cloud Kitchen #DELHI", 
                price: 390, 
                desc: "Char-grilled cottage cheese cubes simmered in spiced gravy served with laccha paratha.", 
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: "ind-4", 
                name: "Crispy Masala Dosa & Sambar", 
                category: "indian", 
                kitchen: "South Cloud Tiffin Engine", 
                price: 240, 
                desc: "Golden fermented rice crepe filled with potato masala served with chutneys & sambar.", 
                image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: "ind-5", 
                name: "Dal Makhani & Jeera Rice Bowl", 
                category: "indian", 
                kitchen: "Vedic Cloud Kitchen #DELHI", 
                price: 320, 
                desc: "Overnight slow-cooked black lentils in butter & cream served with aromatic cumin basmati rice.", 
                image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80" 
            },
            { id: "f1", name: "Cyberpunk Wagyu Smash Burger", category: "burgers", kitchen: "Cyber Burgers #US-EAST", price: 490, desc: "Smokey smash wagyu, cheddar, truffle aioli on brioche.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
            { id: "f2", name: "Quantum Salmon Sashimi Roll", category: "sushi", kitchen: "Quantum Sushi Hub", price: 650, desc: "Fresh Scottish salmon, avocado, spicy mayo, caviar.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80" },
            { id: "f3", name: "Nebula Truffle & Mushroom Pizza", category: "pizza", kitchen: "Nebula Pizza Pod", price: 590, desc: "Wild chanterelle mushrooms, black truffle paste, mozzarella.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" }
        ];

        let kitchenTickets = [
            { id: "NB-8921", kitchen: "Vedic Cloud Kitchen #DELHI", station: "Tandoor Station #1", items: ["1x Butter Chicken & Garlic Naan (₹450)"], status: "PREPARING" }
        ];

        let cart = [];
        let isFailedOver = false;
        let currentUser = null;

        document.addEventListener("DOMContentLoaded", () => {
            initTabs();
            renderMenu("all");
            initCategoryFilters();
            initCart();
            initKitchen();
            initFailover();
            initEmailAuth();

            setInterval(() => {
                const lat = (9 + Math.random() * 3).toFixed(1);
                document.getElementById("ticker-latency").textContent = `${lat}ms`;
                document.getElementById("dash-latency").textContent = `${lat} ms`;
            }, 2000);
        });

        function initEmailAuth() {
            const loginModal = document.getElementById("login-modal");
            const closeLoginBtn = document.getElementById("close-login-btn");
            const btnSignInTab = document.getElementById("tab-btn-signin");
            const btnRegisterTab = document.getElementById("tab-btn-register");
            const formSignIn = document.getElementById("signin-form");
            const formRegister = document.getElementById("register-form");

            document.body.addEventListener("click", (e) => {
                if (e.target && e.target.closest("#open-login-btn")) {
                    loginModal.classList.add("active");
                }
            });

            closeLoginBtn.onclick = () => loginModal.classList.remove("active");

            btnSignInTab.onclick = () => {
                btnSignInTab.classList.add("active");
                btnRegisterTab.classList.remove("active");
                formSignIn.classList.remove("hidden");
                formRegister.classList.add("hidden");
            };

            btnRegisterTab.onclick = () => {
                btnRegisterTab.classList.add("active");
                btnSignInTab.classList.remove("active");
                formRegister.classList.remove("hidden");
                formSignIn.classList.add("hidden");
            };

            formSignIn.onsubmit = (e) => {
                e.preventDefault();
                const email = document.getElementById("signin-email").value;
                const name = email.split('@')[0].replace('.', ' ').toUpperCase();
                loginUser(email, name);
                loginModal.classList.remove("active");
            };

            formRegister.onsubmit = (e) => {
                e.preventDefault();
                const name = document.getElementById("reg-name").value;
                const email = document.getElementById("reg-email").value;
                loginUser(email, name);
                loginModal.classList.remove("active");
                showToast(`Registered account for ${email}`);
            };

            const saved = localStorage.getItem("nimbusbite_email_user");
            if (saved) {
                try {
                    currentUser = JSON.parse(saved);
                    renderNavAuth();
                } catch(e) {}
            }
        }

        function loginUser(email, name) {
            currentUser = {
                name: name,
                email: email,
                initials: name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
            };
            localStorage.setItem("nimbusbite_email_user", JSON.stringify(currentUser));
            renderNavAuth();
            showToast(`Signed in as ${email}`);
        }

        window.logoutUser = function() {
            const email = currentUser ? currentUser.email : "user";
            currentUser = null;
            localStorage.removeItem("nimbusbite_email_user");
            renderNavAuth();
            showToast(`Logged out ${email}`);
        };

        function renderNavAuth() {
            const container = document.getElementById("nav-auth-container");
            if (currentUser) {
                container.innerHTML = `
                    <div class="user-profile-badge">
                        <div class="user-avatar">${currentUser.initials}</div>
                        <div class="user-info-text">
                            <span class="user-info-name">${currentUser.name}</span>
                            <span class="user-info-email">${currentUser.email}</span>
                        </div>
                        <button class="logout-icon-btn" onclick="logoutUser()" title="Logout User">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <button class="btn btn-outline" id="open-login-btn">
                        <i class="fa-solid fa-envelope"></i> Email Sign In
                    </button>
                `;
            }
        }

        function initTabs() {
            document.querySelectorAll(".nav-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
                    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
                    btn.classList.add("active");
                    document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
                });
            });
        }

        function renderMenu(category) {
            const grid = document.getElementById("menu-items-grid");
            grid.innerHTML = "";

            const itemsToDisplay = category === "all" 
                ? MENU_DATA 
                : MENU_DATA.filter(item => item.category === category);

            itemsToDisplay.forEach(item => {
                grid.innerHTML += `
                    <div class="food-card">
                        <div class="food-img-wrapper" style="background-image: url('${item.image}')">
                            <span class="cloud-kitchen-badge">${item.kitchen}</span>
                        </div>
                        <div class="food-details">
                            <h3 class="food-title">${item.name}</h3>
                            <p class="food-desc">${item.desc}</p>
                            <div class="food-footer">
                                <span class="food-price">₹${item.price.toFixed(2)}</span>
                                <button class="btn btn-primary" onclick="addToCart('${item.id}')">+ Add Order</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        function initCategoryFilters() {
            const filterButtons = document.querySelectorAll(".filter-btn");
            filterButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    filterButtons.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const category = btn.getAttribute("data-category");
                    renderMenu(category);
                });
            });
        }

        function initCart() {
            const drawer = document.getElementById("cart-drawer");
            document.getElementById("open-cart-btn").onclick = () => drawer.classList.add("active");
            document.getElementById("close-cart-btn").onclick = () => drawer.classList.remove("active");
            document.getElementById("checkout-btn").onclick = () => {
                if (!currentUser) {
                    showToast("Please Sign In with your Email before placing an order!");
                    document.getElementById("login-modal").classList.add("active");
                    return;
                }
                drawer.classList.remove("active");
                showToast(`Order dispatched for ${currentUser.email}! Ingested into Kafka.`);
                cart = []; updateCartUI();
            };
        }

        window.addToCart = function(id) {
            const item = MENU_DATA.find(i => i.id === id);
            const exist = cart.find(c => c.id === id);
            if (exist) exist.qty++; else cart.push({ ...item, qty: 1 });
            updateCartUI();
            showToast(`Added ${item.name} to Cart`);
        };

        function updateCartUI() {
            const count = cart.reduce((s, i) => s + i.qty, 0);
            const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
            const dispatchFee = total > 0 ? 49 : 0;
            const grandTotal = total + dispatchFee;

            document.getElementById("cart-count").textContent = count;
            document.getElementById("cart-total-nav").textContent = `₹${total.toFixed(2)}`;
            document.getElementById("cart-subtotal").textContent = `₹${total.toFixed(2)}`;
            document.getElementById("cart-grand-total").textContent = `₹${grandTotal.toFixed(2)}`;
            document.getElementById("checkout-btn").disabled = cart.length === 0;

            const container = document.getElementById("cart-items-container");
            container.innerHTML = cart.length === 0 ? "<p style='text-align:center; padding:40px;'>Cart empty.</p>" : "";
            cart.forEach(i => {
                container.innerHTML += `<div class="cart-item"><div><strong>${i.name}</strong><br><small>₹${i.price.toFixed(2)}</small></div><div>x${i.qty}</div></div>`;
            });
        }

        function initKitchen() {
            renderKitchen();
            document.getElementById("add-mock-order-btn").onclick = () => {
                kitchenTickets.unshift({ id: `NB-${Math.floor(9000 + Math.random()*999)}`, kitchen: "Vedic Cloud Kitchen #DELHI", station: "Tandoor Station #2", items: ["1x Paneer Tikka Masala (₹390)"], status: "PREPARING" });
                renderKitchen();
                showToast("New Indian Cuisine ticket ingested!");
            };
        }

        function renderKitchen() {
            const grid = document.getElementById("kitchen-queue-grid");
            grid.innerHTML = "";
            kitchenTickets.forEach((t, idx) => {
                grid.innerHTML += `
                    <div class="kitchen-ticket">
                        <div class="ticket-header"><span class="ticket-id">${t.id}</span><span class="badge purple">${t.status}</span></div>
                        <ul class="ticket-items">${t.items.map(i => `<li>${i}</li>`).join('')}</ul>
                        <button class="btn btn-outline btn-block" onclick="advanceTicket(${idx})">Mark Ready for Drone</button>
                    </div>
                `;
            });
        }

        window.advanceTicket = function(idx) {
            kitchenTickets[idx].status = "READY";
            renderKitchen();
            showToast(`Order ${kitchenTickets[idx].id} marked READY for drone pickup!`);
        };

        function initFailover() {
            document.getElementById("trigger-failover-btn").onclick = () => {
                isFailedOver = !isFailedOver;
                document.getElementById("global-pulse-dot").classList.toggle("failover");
                document.getElementById("global-status-text").innerHTML = isFailedOver ? "<strong style='color:var(--accent-orange);'>US-East Outage! Route53 Switched to US-West-2</strong>" : "AWS US-East & EU-Central | <strong>Operational</strong>";
                document.getElementById("ticker-region").textContent = isFailedOver ? "US-WEST-2 (Failover)" : "US-EAST-1 (Primary)";
                showToast(isFailedOver ? "FAILOVER: Redirected 100% traffic to Oregon Cluster!" : "Restored to Primary Region.");
            };
        }

        function showToast(msg) {
            const c = document.getElementById("toast-container");
            const t = document.createElement("div");
            t.className = "toast";
            t.innerHTML = `<i class="fa-solid fa-cloud-bolt accent-text"></i> <span>${msg}</span>`;
            c.appendChild(t);
            setTimeout(() => t.remove(), 3500);
        }
