/**
 * Lưu trữ các phương thức xử lý thể loại
 */

//khởi tạo biến lưu trữ dữ liệu state
const initState = {
  genre: "",
  genreList: {},
};

const Set_Genre = "Set_Genre";
const Update_Genre = "Update_Genre";

const Compare_Genre = "Compare_Genre";
const setGenre = (method) => ({
  type: Set_Genre,
  method,
});
const updateGenre = (method) => ({
  type: Update_Genre,
  method,
});

const compareGenre = (method) => ({
  type: Compare_Genre,
  method,
});

export {
  Set_Genre,
  Update_Genre,
  Compare_Genre,
  setGenre,
  updateGenre,
  compareGenre,
  initState,
};
