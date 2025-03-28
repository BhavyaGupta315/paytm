export async function getInitials(){
    const token = localStorage.getItem('token');
    if(!token){
        console.log("No Token Found");
        return null;
    }

    try {
        const response = await fetch("/api/user", {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        });
        
        if(!response.ok){
            console.error("Failed to fetch user Data");
            return null;
        }
        const json = await response.json();
        
        const firstNameInitial = json.user.firstName[0];
        const lastNameInitial = json.user.lastName[0];
        return firstNameInitial + lastNameInitial;
        
    }catch(err){
        console.error("Failed to fetch user Data ", err);
        return null;
    }
}

export async function getBalance(){
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found");
        return null;
    }

    try {
        const response = await fetch("/api/balance", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch balance");
            return null;
        }

        const json = await response.json();
        return json.balance; 
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
}

export async function getUsers({filter} : {filter : string}){
    try {
        const response = await fetch(`/api/users/bulk?filter=${filter}`, {
            method: "GET",
        });

        if (!response.ok) {
            console.error("Failed to fetch users");
            return null;
        }

        const json = await response.json();
        return json.users; 
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}
