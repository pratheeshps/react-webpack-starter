import React, { useEffect, useMemo, useState } from "react";

const CHARACTERS = [
    "Howard Wolowitz",
    "Bernadette Rostenkowski",
    "Rajesh Koothrappali",
    "Sheldon Cooper",
    "Leonard Hofstadter",
    "Penny",
    "Amy Farrah Fowler",
];

const Characters = () => {
    const [images, setImages] = useState();

    const loadImage = async (imageName) => {
        return await import(`./images/${imageName}.jpg`);
    };

    const getlist = async () => {
        const imageUrls = await Promise.all(
            CHARACTERS.map(async (character) => ({
                name: character,
                url: await loadImage(character),
            }))
        );
        setImages(imageUrls);
    };

    useEffect(() => {
        getlist();
    }, []);

    return (
        <div className="characters-container">
            <div className="cards">
                {CHARACTERS.map((character) => (
                    <div key={character} className="card">
                        {images && (
                            <img
                                src={
                                    images.find((img) => img.name === character)
                                        .url.default
                                }
                                alt={"image:"}
                            />
                        )}

                        <h1>{character}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
