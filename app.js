const cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create elements and render cafe
function renderCafe(doc){
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id',doc.id);

    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'x'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)


    cafelist.appendChild(li)

    //deleting data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        //console.log('Hello');
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

}

//getting data

// db.collection('cafes').get().then((snapshot)=>{
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         //console.log(doc.data())
//         renderCafe(doc);
//     });
// })
        

// db.collection('cafes').where('city','==','london').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         //console.log(doc.data())
//         renderCafe(doc);
//     });
// })

// db.collection('cafes').where('city','==','london').orderBy('name').get().then((snapshot)=>{
//         snapshot.docs.forEach(doc => {
//             //console.log(doc.data())
//             renderCafe(doc);
//         });
//     })

//updating
// db.collection('cafes').doc('...........id......').update({
//     city: "delhi"
// })
//->.set method overwrites whole document
// db.collection('cafes').doc('...........id......').set({
//     city: "delhi"
// })



//saving data

form.addEventListener('submit',(e)=>{
   e.preventDefault();
   db.collection('cafes').add({
       name: form.name.value,
       city: form.city.value

   });
   form.name.value='';
   form.city.value='';
})

//real-time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        // console.loglog(change.doc.data())
        if(change.type =='added'){
            renderCafe(change.doc);
        }
        else if (change.type =='removed'){
            let li = cafelist.querySelector('[data-id=' + change.doc.id + ']')
            cafelist.removeChild(li);
        }
    })
})

