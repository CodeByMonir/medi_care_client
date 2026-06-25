import React from 'react';

const page = async ({ params }) => {

    const resolvedParams = await params;
    const id = resolvedParams?.id;
    return (
        <div>
            <h1>id : ${id}</h1>
        </div>
    );
};

export default page;