let counter =
{
    count: 0,
    setCount: function(e, act) {
            if (act === 'plus') {
                this.count = e.previousSibling.innerHTML = +e.previousSibling.innerHTML + 1;
            } else if (act === 'minus') {
                this.count = e.nextSibling.innerHTML = +e.nextSibling.innerHTML - 1;
            }
        }
}

export {counter};