const handleSorting = (sortType, page = "") => {
    let temp = sortType;

    if (page === "users" && temp === "Name") {
        temp = "Username";
    } else if (page === "users" && temp === "Vote") {
        temp = "Popular users";
    }

    switch (temp) {
        case "Newest":
            return (a, b) => new Date(b.created_at) - new Date(a.created_at);
        case "New":
            return (a, b) => new Date(b.created_at) - new Date(a.created_at);
        case "New Users":
            return (a, b) => new Date(b.created_at) - new Date(a.created_at);
        case "Top":
            return (a1, b1) =>
                (b1.votes || []).reduce((a, b) => {
                    return a + b.vote;
                }, 0) -
                (a1.votes || []).reduce((a, b) => {
                    return a + b.vote;
                }, 0);
        case "Question":
            return (a, b) =>
                b.posts_count - a.posts_count;
        case "View":
            return (a, b) => b.views - a.views;
        case "Oldest":
            return (a, b) => new Date(a.created_at) - new Date(b.created_at);
        case "Popular":
            return (a, b) => b.posts_count - a.posts_count;
        case "Name":
            return (a, b) => a.tagname.localeCompare(b.tagname);
        case "Username":
            return (a, b) => a.username.localeCompare(b.username);
        case "Popular users":
            return (a, b) => b.votes - a.votes;
        case "Vote":
            return (a1, b1) =>
                (b1.votes || []).reduce((a, b) => {
                    return a + b.vote;
                }, 0) -
                (a1.votes || []).reduce((a, b) => {
                    return a + b.vote;
                }, 0);
        default:
            break;
    }
};

export default handleSorting;