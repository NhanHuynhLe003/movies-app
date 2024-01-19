import { Set_Genre, Update_Genre } from "./constants";

//hàm reducer được dùng để xử lý về thể loại phim
export default function reducer(state, action) {
  //action là object được return của các hàm add_genre, set_genre, del_genre
  //state là giá trị result được trả về trước đó, init la {genre: '' va genreList: []}

  //action la tham so truyen vo dispatch o day la function setGenre va addGenre return ve 1 obj
  let result;
  const payload = action.method;

  switch (action.type) {
    case Set_Genre:
      const tmpGenreList = { ...state.genreList };
      tmpGenreList[payload] = true;
      result = {
        ...state,
        genre: payload,
        genreList: tmpGenreList,
      };

      break;
    case Update_Genre:
      const tmpGenreListUpdate = { ...state.genreList };

      if (!state.genreList[payload]) {
        tmpGenreListUpdate[payload] = true;
        // chưa có thể loại thì cho nó true còn ngc lại thì cho false. Cuối cùng chỉ lọc những thể loại true thôi

        result = {
          ...state,
          genre: payload,
          genreList: tmpGenreListUpdate,
        };
      } else {
        tmpGenreListUpdate[payload] = false;
        result = {
          ...state,
          genre: payload,
          genreList: tmpGenreListUpdate,
        };
      }

      break;

    default:
      throw new Error("invalid case");
  }

  return result;
}
