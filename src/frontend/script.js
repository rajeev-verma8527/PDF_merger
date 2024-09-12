document.getElementById('merge-button').addEventListener('click', function() {
    const files = document.getElementById('pdf-files').files;
    
    if (files.length === 0) {
        alert('Please select PDF files to merge.');
        return;
    }
    else if(files.length === 1){
        alert('You have added only 1 file')
        return
    }

    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('progress-section').classList.remove('hidden');

    mergeFiles(files).then(obj => {
        document.getElementById('progress-section').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');

        console.log(obj)
        const url = URL.createObjectURL(obj.blob);
        const downlaodbtn = document.getElementById("download-link")
        downlaodbtn.setAttribute("href",url)
        downlaodbtn.setAttribute("download",obj.name)



        // console.log(blob);
    });
});


function mergeFiles(files){
    return new Promise((resolve) => {

        const formData = new FormData()
        
        for(let i = 0; i< files.length; i++){
            formData.append('files',files[i])
        }

        request = new Request("/merge",{
            method: 'POST',
            body: formData
        })

        fetch(request).then((res) =>{
            if(!res.ok){
                alert("Some error occured!")
            }
            else{

                const name = res.headers.get("Content-Disposition").split("filename=")[1].replaceAll('"','')
                res.blob().then(blob =>{
                    resolve({
                        name:name,
                        blob:blob
                    })
                })
            }
        })
    })
}


// drag and drop
const body = document.querySelector("body")
const droparea = document.querySelector("#droparea")

body.addEventListener("dragenter",()=>{
    droparea.classList.remove("hidden")
})

droparea.addEventListener("dragleave",()=>{
    droparea.classList.add("hidden")
})
droparea.addEventListener("dragover",(e)=>{
    e.preventDefault()
})

droparea.addEventListener("drop",(e) =>{
    e.preventDefault()
    const files = e.dataTransfer.files
    droparea.classList.add("hidden")

    for( let file of files){
        if(file.type !== "application/pdf"){
            alert("One or more files are not pdfs")
            return
        }
    }

    input = document.querySelector("input#pdf-files")

    // const dataTransfer = DataTransfer()
    // dataTransfer.addElement()

    document.querySelector("input#pdf-files").files = files
    // console.log(input)
    console.log(files.constructor)




    e.stopPropagation()
})
