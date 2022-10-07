import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import { ThreeCircles } from 'react-loader-spinner';
import FetchImages from '../api/GalleryApi';

export class App extends Component {
  state = {
    page: 1,
    input: '',
    data: [],
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { input, page } = this.state;

    if (prevState.input !== input || page !== prevState.page) {
      this.setState({ loading: true });

      FetchImages(page, input)
        .then(imgArr => {
          if (input !== prevState.input) this.setState({ data: imgArr.hits });
          else
            this.setState(prevState => {
              return {
                data: [...prevState.data, ...imgArr.hits],
              };
            });
        })
        .catch(error => console.log(error))
        .finally(this.setState({ loading: false }));
      return;
    }
  }

  onSubmit = input => {
    this.setState({
      input,
      page: 1,
    });
  };

  onClick = e => {
    if (e) {
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
        };
      });
    }
  };

  render() {
    const { data, loading, input } = this.state;
    return (
      <>
        <SearchBar onSub={this.onSubmit} />
        {data && <ImageGallery inputData={data} />}
        {loading && (
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        )}
        {input && !loading && <Button handleClick={this.onClick} />}
        <ToastContainer />
      </>
    );
  }
}

// const STATE = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   COMPLETED: 'completed',
//   REJECTED: 'rejected',
// };

// export class App extends Component {
//   state = {
//     page: 1,
//     input: '',
//     data: null,
//     loading: false,
//     status: STATE.IDLE,
//   };

//   componentDidUpdate(_, prevState) {
//     const { input, page } = this.state;
//     const { ADDRESS, KEY } = params;

//     if (prevState.input !== input) {
//       this.setState({ page: 1, loading: true, status: STATE.PENDING });

//       FetchImages(ADDRESS, KEY, page, input)
//         .then(imgArr =>
//           this.setState({ data: imgArr.hits, status: STATE.COMPLETED })
//         )
//         .catch(error => {
//           console.log(error);
//           this.setState({ status: STATE.REJECTED });
//         });

//       return;
//     }

//     if (page !== prevState.page) {
//       this.setState({ status: STATE.PENDING });

//       FetchImages(ADDRESS, KEY, page, input)
//         .then(imgArr =>
//           this.setState(prevState => {
//             return {
//               data: [...prevState.data, ...imgArr.hits],
//               status: STATE.COMPLETED,
//             };
//           })
//         )
//         .catch(error => {
//           console.log(error);
//           this.setState({ status: STATE.REJECTED });
//         });

//       return;
//     }
//   }

//   onSubmit = input => {
//     this.setState({
//       input,
//       page: 1,
//     });
//   };

//   onClick = e => {
//     if (e) {
//       this.setState(prevState => {
//         return {
//           page: prevState.page + 1,
//         };
//       });
//     }
//   };

//   render() {
//     if (this.state.status === 'idle') {
//       return <p>Введите имя изображения</p>;
//     }
//     if (this.state.status === 'pending') {
//       return (
//         <ThreeCircles
//           height="100"
//           width="100"
//           color="#4fa94d"
//           wrapperStyle={{}}
//           wrapperClass="loader"
//           visible={true}
//           ariaLabel="three-circles-rotating"
//           outerCircleColor=""
//           innerCircleColor=""
//           middleCircleColor=""
//         />
//       );
//     }
//     if (this.state.status === 'completed') {
//       return <ImageGallery inputData={this.state.data} />;
//     }
//     if (this.state.status === 'rejected') {
//       return <p>что-то пошло не так, попробуйте еще раз</p>;
//     }

//     return (
//       <>
//         <SearchBar onSub={this.onSubmit} />

//         {this.state.input && !this.state.loading && (
//           <Button handleClick={this.onClick} />
//         )}
//         <ToastContainer />
//       </>
//     );
//   }
// }

export default App;

//fetch change to async/await+
//write props +
//status machine (1.13) -
//make alert +
