export function StartTypedEffect(id, typedId) {
    setTimeout(TypedEffect(id, typedId), 60000);//4300
}

function TypedEffect(id, typedId) {
    new Typed(`#${typedId}`, {
        stringsElement: `#${id}`
    });
}