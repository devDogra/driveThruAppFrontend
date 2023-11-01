export default function getPagenameFromRoute(string) {
    if (string == '/') return "Home";
    string = string.slice(1);
    return string.charAt(0).toUpperCase() + string.slice(1);
}