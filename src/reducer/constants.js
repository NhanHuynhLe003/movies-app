
const initState = {
    genre: '',
    genreList: []
}
const Set_Genre = 'Set_Genre';
const Add_Genre = 'Add_Genre';
const Del_Genre = 'Del_Genre';
const Compare_Genre = 'Compare_Genre';
const setGenre = method => ({
    type: Set_Genre,
    method
})
const addGenre = method => ({
    type: Add_Genre,
    method
})

const delGenre = method => ({
    type: Del_Genre,
    method
})

const compareGenre = method => ({
    type: Compare_Genre,
    method
})

export {Set_Genre, Add_Genre, Del_Genre, Compare_Genre, setGenre, addGenre, delGenre,compareGenre, initState}