const viewDepartments = async () => {
    try {

        const [departments] = await findAllDepartments();
        console.table(departments);

    } catch (error) {
        console.error("Error: ", error);
    }

    startMenu();
};



const viewRoles = async () => {
    try {

        const roles = await getRoles();
        console.table(roles);

    } catch (error) {
        console.error("Error occurred:", error);
    }

    startMenu();
};
