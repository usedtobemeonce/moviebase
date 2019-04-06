export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function stringFromArrayNameProps(array) {
    return array.map(prop => prop.name).join(', ');
}