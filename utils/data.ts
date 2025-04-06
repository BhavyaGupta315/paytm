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
            console.log("Failed to fetch user Data");
            return null;
        }
        const json = await response.json();
        
        const firstNameInitial = json.user.firstName[0];
        const lastNameInitial = json.user.lastName[0];
        const userId = json.user._id;
        return {Initials : firstNameInitial + lastNameInitial, userId : userId};
        
    }catch(err){
        console.log("Failed to fetch user Data ", err);
        return null;
    }
}

export async function getBalance(){
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No token found");
        return null;
    }

    try {
        const response = await fetch("/api/account/balance", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch balance");
            return null;
        }

        const json = await response.json();
        return json.balance; 
    } catch (error) {
        console.log("Error fetching balance:", error);
        return null;
    }
}

export async function getUsers(filter : string){
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return null;
        }
        const response = await fetch(`/api/user/bulk?filter=${filter}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch users");
            return null;
        }

        const json = await response.json();
        return json.users; 
    } catch (error) {
        console.log("Error fetching users:", error);
        return null;
    }
}
export async function getTransactionHistory(){
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return null;
        }
        const response = await fetch(`/api/user/transactionHistory`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch users");
            return null;
        }

        const json = await response.json();
        console.log(json);
        return json.transactions; 
    } catch (error) {
        console.log("Error fetching users:", error);
        return null;
    }
}

export interface TransactionHistoryCardProps {
    account : {
        _id: string;
        firstName: string;
        lastName: string;
    }
    amount: number;
    date: string;
    transactionType: string;
}