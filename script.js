 // Global variables
 const apiUrl = 'https://jsonplaceholder.typicode.com/todos/'; // Replace with your API URL
 const rowsPerPage = 10;
 let currentPage = 1;
 let totalPages = 1;
 let currentData = [];

 // Function to fetch data from the API
 async function fetchData(page = 1, searchQuery = '') {
   try {
    const response = await fetch(`?_page=${page}&_limit=${rowsPerPage}&q=${searchQuery}`);
     const data = await response.json();
     totalPages = Math.ceil(100 / rowsPerPage); // Update total pages if your API provides total records
     currentData = data;
     renderTable();
     renderPagination();
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 }

 // Function to render table data
 function renderTable() {
   const tableBody = document.getElementById('tableBody');
   tableBody.innerHTML = ''; // Clear existing rows

   currentData.forEach(item => {
     const row = document.createElement('tr');
     row.innerHTML = `
       <td>${item.userId}</td>
       <td>${item.id}</td>
       <td>${item.title}</td>
       <td>${item.completed}</td>
     `;
     tableBody.appendChild(row);
   });
 }

 // Function to render pagination buttons
 function renderPagination() {
   const pagination = document.getElementById('pagination');
   pagination.innerHTML = '';

   // Prev Button
   const prevButton = document.createElement('button');
   prevButton.textContent = 'Previous';
   prevButton.disabled = currentPage === 1;
   prevButton.onclick = () => changePage(currentPage - 1);
   pagination.appendChild(prevButton);

   // Page Buttons
   for (let i = 1; i <= totalPages; i++) {
     const pageButton = document.createElement('button');
     pageButton.textContent = i;
     pageButton.disabled = i === currentPage;
     pageButton.onclick = () => changePage(i);
     pagination.appendChild(pageButton);
   }

   // Next Button
   const nextButton = document.createElement('button');
   nextButton.textContent = 'Next';
   nextButton.disabled = currentPage === totalPages;
   nextButton.onclick = () => changePage(currentPage + 1);
   pagination.appendChild(nextButton);
 }

 // Function to handle page change
 function changePage(page) {
   currentPage = page;
   fetchData(currentPage, document.getElementById('search').value);
 }

 // Handle search input
 document.getElementById('search').addEventListener('input', (e) => {
   fetchData(currentPage, e.target.value);
 });

 // Initialize the table with data on page load
 fetchData(currentPage);

