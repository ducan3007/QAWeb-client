const htmlSubstring = (s, n) => {
    var m,
        r = /<([^>\s]*)[^>]*>/g,
        stack = [],
        lasti = 0,
        result = "";

    while ((m = r.exec(s)) && n) {
        var temp = s.substring(lasti, m.index).substr(0, n);

        result += temp;
        n -= temp.length;
        lasti = r.lastIndex;

        if (n) {
            result += m[0];
            if (m[1].indexOf("/") === 0) {
                stack.pop();
            } else if (m[1].lastIndexOf("/") !== m[1].length - 1) {
                stack.push(m[1]);
            }
        }
    }

    result += s.substr(lasti, n);

    while (stack.length) {
        result += "</" + stack.pop() + ">";
    }

    return result;
};

export default htmlSubstring;