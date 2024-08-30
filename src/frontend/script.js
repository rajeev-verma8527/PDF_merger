document.getElementById('merge-button').addEventListener('click', function() {
    const files = document.getElementById('pdf-files').files;
    
    if (files.length === 0) {
        alert('Please select PDF files to merge.');
        return;
    }

    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('progress-section').classList.remove('hidden');

    // Simulate file merging process
    simulateFileMerge(files).then(mergedPdfUrl => {
        document.getElementById('progress-section').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');
        document.getElementById('download-link').href = mergedPdfUrl;
    });
});


// TO-DO : rewrite

function simulateFileMerge(files) {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            document.getElementById('progress-bar-fill').style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                resolve('path/to/merged.pdf'); // Replace with actual file URL
            }
        }, 500);
    });
}
