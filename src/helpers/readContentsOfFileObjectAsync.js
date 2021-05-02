const readContentsOfFileObjectAsync = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;

        fileReader.readAsText(file);
        });
};

export default readContentsOfFileObjectAsync;