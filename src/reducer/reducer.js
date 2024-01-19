import { Add_Genre, Set_Genre, Del_Genre } from "./constants";

//hàm reducer được dùng để xử lý về thể loại phim
export default function reducer(state, action) {
  //action là object được return của các hàm add_genre, set_genre, del_genre
  //state là giá trị result được trả về trước đó

  //action la tham so truyen vo dispatch o day la function setGenre va addGenre return ve 1 obj
  let result;

  switch (action.type) {
    case Set_Genre:
      result = {
        ...state,
        genre: action.method,
      };

      break;
    case Add_Genre:
      result = {
        ...state,
        genreList: [...state.genreList, action.method],
      };

      break;
    case Del_Genre:
      const tempGenreList = state.genreList.filter((newGenre, index) => {
        return newGenre !== action.method;
      });

      result = {
        ...state,
        genreList: [...tempGenreList],
      };
      break;

    default:
      throw new Error("invalid case");
  }

  return result;
}
