import React from "react";

const items = [{ name: "one" }, { name: "two" }, { name: "three" }];

function AppExample() {
    const [mediaItem, setMediaItem] = React.useState(items[0]); // <-- seed initial state
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timerId = setInterval(
            () => setIndex((i) => (i + 1) % items.length), // <-- increment index
            50
        );
        return () => clearInterval(timerId);
    }, []);

    React.useEffect(() => {
        setMediaItem(items[index]); // <-- update media state when index updates
    }, [index]);

    return (
        <div className="App">
            <div>Media: {mediaItem.name}</div>
        </div>
    );
}

export default AppExample