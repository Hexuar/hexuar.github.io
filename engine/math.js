// Rounds a floating-point number to n digits
Math.roundF = function (x, n = 0) {
    let N = Math.pow(10,n);
    return Math.round(x * N) / N;
}

// Distance between points a & b
Math.distance = function(posA, posB) {
    return Math.sqrt(Math.pow(posB.x - posA.x, 2) + Math.pow(posB.y - posA.y, 2));
}

// Square
Math.sq = function(x) {
    return Math.pow(x, 2);
}