// helper function for on change event handlers to update associated states
function handleChange<T>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFunction: React.Dispatch<React.SetStateAction<T>>) {
    const { name, value } = e.target;
    setFunction((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

export default handleChange;