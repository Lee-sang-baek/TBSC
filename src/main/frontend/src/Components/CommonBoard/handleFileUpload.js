const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/notices/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully.');
                const data = await response.text(); // 업로드된 파일의 경로나 다른 정보를 받아올 수 있음
                console.log('Uploaded file path:', data);
                // 여기서 받은 파일 경로를 적절히 처리하거나 사용할 수 있습니다.
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
};
