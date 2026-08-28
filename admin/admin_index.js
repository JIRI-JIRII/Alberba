        // Navigation function
        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            document.getElementById(sectionId).classList.add('active');
            event.target.classList.add('active');
        }

        // Logout function
        function handleLogout() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../func/logout.php';
            }
        }

        // Patient search/filter function
        function filterPatients() {
            const searchInput = document.getElementById('searchInput');
            const filter = searchInput.value.toLowerCase();
            const table = document.getElementById('patientsTableBody');
            const rows = table.getElementsByTagName('tr');
            let visibleCount = 0;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const text = row.textContent || row.innerText;
                
                if (text.toLowerCase().indexOf(filter) > -1) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            }

            document.getElementById('patientCount').textContent = visibleCount + ' patients';
        }

        // Billing search/filter function
        function filterBillingTable() {
            const searchInput = document.getElementById('billingSearchInput');
            const filter = searchInput.value.toLowerCase();
            const table = document.getElementById('billingTableBody');
            const rows = table.getElementsByTagName('tr');
            let visibleCount = 0;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const text = row.textContent || row.innerText;
                
                if (text.toLowerCase().indexOf(filter) > -1) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            }
        }

        // Reports date filter toggle
        function toggleCustomDates() {
            const select = document.getElementById('dateRangeSelect');
            const startGroup = document.getElementById('startDateGroup');
            const endGroup = document.getElementById('endDateGroup');
            
            if (select.value === 'custom') {
                startGroup.style.display = 'flex';
                endGroup.style.display = 'flex';
            } else {
                startGroup.style.display = 'none';
                endGroup.style.display = 'none';
            }
        }

        // Maintenance functions
        function updateFileName(input) {
            const fileName = document.getElementById('fileName');
            if (input.files && input.files[0]) {
                fileName.textContent = input.files[0].name;
                fileName.style.color = 'var(--success-green)';
            } else {
                fileName.textContent = 'No file chosen';
                fileName.style.color = 'var(--text-gray)';
            }
        }

        function backupDatabase() {
            if (confirm('This will download a backup of your entire database. Continue?')) {
                // Create a form and submit it to trigger download
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '../func/backup_database.php';
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
                
                alert('Database backup started! The download will begin shortly.');
            }
        }

        function restoreDatabase() {
            const fileInput = document.getElementById('restoreFile');
            
            if (!fileInput.files || !fileInput.files[0]) {
                alert('Please select a backup file first!');
                return;
            }

            if (!confirm('⚠️ WARNING: This will replace ALL current data with the backup file. This action CANNOT be undone. Are you absolutely sure?')) {
                return;
            }

            if (!confirm('Final confirmation: Do you really want to restore the database? All current data will be lost!')) {
                return;
            }

            const formData = new FormData();
            formData.append('restoreFile', fileInput.files[0]);

            // Show loading message
            alert('Restoring database... Please wait and do not close this window.');

            fetch('../func/restore_database.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('✓ Database restored successfully!');
                    location.reload();
                } else {
                    alert('✗ Error restoring database: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                alert('✗ Error: ' + error.message);
            });
        }

        // Auto-hide alerts after 5 seconds
        setTimeout(() => {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                alert.style.transition = 'opacity 0.5s';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            });
        }, 5000);