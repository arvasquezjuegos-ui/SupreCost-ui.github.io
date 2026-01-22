
        // Page transition on load
        window.addEventListener('load', () => {
            const transition = document.getElementById('page-transition');
            transition.classList.add('active');
            setTimeout(() => {
                transition.classList.remove('active');
            }, 1000);
        });

        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar todos los elementos con animación
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-item').forEach(el => {
            observer.observe(el);
        });

        // Smooth page transitions para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const transition = document.getElementById('page-transition');
                        transition.classList.add('active');
                        
                        setTimeout(() => {
                            target.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                                transition.classList.remove('active');
                            }, 300);
                        }, 300);
                    }
                }
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });

        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        });

        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias! Tu solicitud ha sido enviada.');
            e.target.reset();
        });

        // CHATBOT FUNCIONAL
        const chatToggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');

        const servicios = {
            'calidad': 'Nuestras asesorías de calidad ayudan a optimizar estándares y asegurar la excelencia en su negocio. ¿Le gustaría agendar una consulta?',
            'proyectos': 'Ofrecemos gestión estratégica y técnica para el éxito de sus iniciativas. ¿En qué tipo de proyecto podemos ayudarle?',
            'procesos': 'Realizamos análisis detallado para mejorar la eficiencia operativa de su empresa. ¿Qué procesos desea optimizar?',
            'documentación': 'Estructuramos manuales y procedimientos corporativos claros. ¿Necesita documentar algún proceso específico?',
            'web': 'Creamos sitios web modernos y optimizados para su negocio. ¿Qué tipo de página web necesita?',
            'seguridad': 'Vendemos equipos de seguridad avanzados con vigilancia certificada 24/7. ¿Qué sistema de seguridad le interesa?'
        };

        function addMessage(text, isUser = false) {
            const div = document.createElement('div');
            div.className = `flex justify-${isUser ? 'end' : 'start'} chat-message`;
            div.innerHTML = `<div class="bg-${isUser ? 'black' : 'white'} text-${isUser ? 'white' : 'gray-800'} p-3 rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'} border border-gray-100 shadow-sm max-w-[80%]">${text}</div>`;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            const div = document.createElement('div');
            div.id = 'typing';
            div.className = 'flex justify-start';
            div.innerHTML = '<div class="bg-white p-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTyping() {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        }

        function getBotResponse(userMessage) {
            const msg = userMessage.toLowerCase();
            
            if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
                return '¡Hola! 👋 Bienvenido a SupreConst. ¿En qué servicio estás interesado? Ofrecemos: asesorías de calidad, proyectos, procesos, documentación, páginas web y equipos de seguridad.';
            }
            
            for (let [key, value] of Object.entries(servicios)) {
                if (msg.includes(key)) return value;
            }
            
            if (msg.includes('precio') || msg.includes('costo') || msg.includes('cotiza')) {
                return 'Los precios varían según sus necesidades específicas. ¿Le gustaría que un consultor se comunique con usted? Puede llamarnos al +506 8888-0000 o enviarnos un email a contacto@supreconst.com';
            }
            
            if (msg.includes('contacto') || msg.includes('teléfono') || msg.includes('email')) {
                return '📞 Puede contactarnos al +506 8888-0000 o por email a contacto@supreconst.com. También estamos en Calle Principal #123, Distrito Tecnológico.';
            }
            
            if (msg.includes('horario')) {
                return 'Estamos disponibles de lunes a viernes de 8:00 AM a 6:00 PM. Para emergencias de seguridad, contamos con soporte 24/7.';
            }
            
            return 'Gracias por su consulta. Para una atención personalizada, puede contactarnos al +506 8888-0000 o escribirnos a contacto@supreconst.com. ¿Hay algo más en lo que pueda ayudarle?';
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            addMessage(message, true);
            chatInput.value = '';
            
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage(getBotResponse(message));
            }, 1000 + Math.random() * 1000);
        }

        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active') && chatMessages.children.length === 0) {
                addMessage('¡Hola! 👋 Soy el asistente de <strong>SupreConst</strong>. ¿En qué puedo asesorarte hoy?');
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
 