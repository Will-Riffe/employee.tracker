const viewDepartments = async () => {
    try {

        const [departments] = await findAllDepartments();
        console.table(departments);

    } catch (error) {
        console.error("Error: ", error);
    }

    startMenu();
};


