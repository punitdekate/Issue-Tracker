function deleteEmployee(customId, role) {
    console.log(customId, role)
    if (role == "Admin") {
        displayPopup("Administrative users cannot be deleted");
    } else {
        const yesBtn = document.getElementById('btn-yes');
        const noBtn = document.getElementById('btn-no');
        const popUp = document.getElementById('popup-overlay');
        popUp.style.display = 'flex';
        yesBtn.addEventListener('click', () => {
            fetch(`http://localhost:3400/main_page/view_employee/${customId}`, {
                method: "DELETE"
            }).then(response => {
                window.location.href = response.url;
                popUp.style.display = 'none';
                displayPopup("User removed successfully")
            }).catch(error => {
                console.log(error);
            })
        })
        noBtn.addEventListener("click", () => {
            popUp.style.display = 'none';
        })
    }
}

async function updateAdmin(customId, role) {
    if (role == "Admin") {
        displayPopup("Already admin user");
    } else {
        fetch(`http://localhost:3400/main_page/view_employee/update_role/${customId}`, {
            method: "GET"
        }).then(response => {
            window.location.href = response.url;
        }).catch(error => {
            console.log(error);
        })
        displayPopup("User updated as admin");
    }
}

function deletePerformance(_id) {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    const popUp = document.getElementById('popup-overlay');
    popUp.style.display = 'flex';
    yesBtn.addEventListener('click', () => {
        fetch(`http://localhost:3400/main_page/view_performance/${_id}`, {
            method: "DELETE"
        }).then(response => {
            window.location.href = response.url;
            popUp.style.display = 'none';
            displayPopup("Performance removed successfully!")

        }).catch(error => {
            console.log(error);
        })
    })
    noBtn.addEventListener("click", () => {
        popUp.style.display = 'none';
    })
}

const assignFeedback = document.getElementById('assign-feedback');
assignFeedback.addEventListener('click', (event) => {
    event.preventDefault();

    const assignReview = document.getElementById('assign_review');
    const formData = new FormData(assignReview);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    console.log(JSON.stringify(jsonData));
    fetch(`http://localhost:3400/main_page/assign_review`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // adjust content type as needed
        },
        body: JSON.stringify(jsonData)
    }).then(response => {
        window.location.href = response.url;
    }).catch(error => {
        console.log(error);
    })
    displayPopup("Review assigned successfully!")
});


// const previous = document.getElementById("previous");
// const currentPage = document.getElementById("pageNumber");
// const next = document.getElementById("next");
// const employeeData = document.getElementById("employee-data");
// let page = 1;
// previous.addEventListener("click", () => {
//     page = parseInt(currentPage.innerText);
//     if (page > 1) {
//         // call to page-1 get data 
//         // fucnction call krna hai 
//         currentPage = page - 1;
//     }
// });
// next.addEventListener("click", () => {
//     let page = parseInt(currentPage.innerText) + 1;
//     // call if response 
//     currentPage = page + 1;
// });

// function fillEmployeeData(data) {
//     data.forEach((data) => {
//         const employee = document.createElement("tr");
//         employee.innerHTML = `< td > $ {
//                 data.customId
//             } < /td> <td>${data.name}</td > < td > $ {
//                 data.phone
//             } < /td> <td>${data.role}</td > < td > $ {
//                 data.jobTitle
//             } < /td> <td>${data.department}</td > < td > $ {
//                 data.location
//             } < /td> <td> <button onclick = "deleteEmployee(${data.customId})"><i class="fa-solid fa-trash"></i > < /button> </td > < td > < a href = 'main_page/employee_view/${data.customId}' > < i class = "fa-solid fa-pen-to-square" > < /i></a > < /td> <td> <a href = 'main_page/employee_view / $ {
//                 data.customId
//             }
//             '><i class="fa-solid fa-eye"></i></a> </td> <td> <a href = '
//             main_page / employee_view / $ {
//                 data.customId
//             } > < i class = "fa-solid fa-user-secret" > < /i ><i class="fa-solid fa-user-tie"></i > < /a> </td >`;
//         employeeData.appendChild(employee);
//     });
//     currentPage.innerText = page;
// }
// fillEmployeeData(data);


function displayPopup(message, duration = 3000) {
    const popUp = document.getElementById('popup-container');
    const popUpMsg = document.getElementById('pop-up-msg');
    popUpMsg.innerText = message;
    popUp.style.display = 'block';
    setTimeout(() => {
        popUp.style.display = 'none';
    }, duration);
}