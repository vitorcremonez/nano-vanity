class Numbers {
    addThousandsSeparator(number) {
        return number.toLocaleString().replace(/,/g, '.');
    }
}

export default Numbers;