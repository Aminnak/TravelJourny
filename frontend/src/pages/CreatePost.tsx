import {SubmitHandler , useForm ,Controller} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileInput from '../components/FileInput'
import JourneyExprience from '../assets/images/JourneyExprience.jpg'

export interface mainFormInterface {
    file: FileList ;
    google_map_link : string;
    title : string;
    location : string;
    description : string;
    year : number;
}

const CreatePost = () => {
    const navigate = useNavigate();
    const {control , register , handleSubmit , formState : {errors}} = useForm<mainFormInterface>()
    const formSubmitHandler : SubmitHandler<mainFormInterface> =async data => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("location", data.location);
        formData.append("google_map_link", data.google_map_link);
        formData.append("year", String(data.year));
        formData.append("description", data.description);

        if (data.file && data.file.length > 0) {
          formData.append("picture", data.file[0]);
        }

        try {
          await axios.post("http://localhost:8000/api/post/create/", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }  catch (err : unknown) {
                    if (err instanceof AxiosError) {
                        const messages: string[] = [];
                        Object.keys(err.response?.data).forEach(item => {
                            messages.push(err.response?.data[item]);
                        })
                        toast(
                            <div className='flex space-x-2 items-center justify-between w-full pr-3'>
                                <p>{messages[0].toLowerCase().startsWith('invalid') ? "You're not logged in." : messages[0]}</p>
                                <button onClick={() => navigate('/login')} className='bg-red-600 rounded-md py-2 px-4 text-white'>
                                    Login
                                </button>
                            </div>,
                            {
                                className: 'border border-purple-600/40',
                            }
                        )
                    } else {
                        toast.error('An unknown error occured')
                    }
                }
    }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className='w-full bg-fixed bg-cover bg-center' style={{backgroundImage : `url(${JourneyExprience})`}}>

        <div className="flex flex-col w-full p-6">
            <div className='rounded-md bg-black/70 min-h-screen'> {/* might cuase display issue in here*/}
                <div className='flex max-md:flex-col-reverse w-full space-x-12 p-6'>
                    <div className='flex flex-col w-4/9 max-md:w-full max-md:mt-8 text-center space-y-4'>
                    <Controller
                        name='file'
                        control={control}
                        rules={{required : 'Choose an image' , validate : (files) => {
                            if(!files) return 'No file selected.'
                            const file = files[0]
                            if(file.size > 5 * 1024 * 1024) return 'File size exceeds 5Mb'
                            if(!file.type.startsWith('image/')) return 'File type must be image'
                            return true
                        }}}
                        render={({field}) => (
                            <FileInput
                                {...field}
                                errors={errors.file?.message}
                            />
                        )}
                    />
                        <p className=''>{errors.file && <span className='text-red-600'>{errors.file.message}</span>}</p>
                    </div>
                    <div className='flex flex-col w-5/9 max-md:w-full space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='' className='text-white font-semibold'>Title</label>
                            <input {...register('title', {required : 'This filed is required.' , minLength : {value : 8 , message : 'Title has to be more than 8 characters.'}})} className='w-full px-4 py-2 rounded-md inset-shadow-sm inset-shadow-black bg-stone-400 text-black focus:outline-none placeholder:text-black/65' type="text" placeholder='Enter your journey title'/>
                            {errors.title && <p className='text-red-600'>{errors.title.message}</p>}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='' className='text-white font-semibold'>Location</label>
                            <input {...register('location' , {required : 'This field is required.' , minLength : {value : 2 , message : 'Location has to be more than 2 characters'}})} className='w-full px-4 py-2 rounded-md inset-shadow-sm inset-shadow-black bg-stone-400 text-black focus:outline-none placeholder:text-black/65' type="text" placeholder='Locate the place'/>
                            {errors.location && <p className='text-red-600'>{errors.location.message}</p>}
                        </div>
                        <div className="flex w-full max-md:flex-col space-x-2">
                            <div className="flex flex-col w-6/10 max-md:w-full space-y-2">
                                <label htmlFor='' className='text-white font-semibold'>Google map link</label>
                                <input {...register('google_map_link' , {required : 'This field is required.' , pattern : {value : /https?:\/\/(www\.)?google\.com\/maps\/(?:place\/[^\/\s]+|search\/\?[^\/\s]*|@[-\d\.]+,[-\d\.]+,\d+z)/ , message : 'Invalid link.'}})} className='px-4 py-2 rounded-md inset-shadow-sm inset-shadow-black bg-stone-400 text-black focus:outline-none placeholder:text-black/65' type="text" placeholder='https://maps.google.com'/>
                                {errors.google_map_link && <p className='text-red-600'>{errors.google_map_link.message}</p>}
                            </div>
                            <div className="flex flex-col w-4/10 max-md:w-4/6 space-y-2">
                                <label htmlFor='' className='text-white font-semibold'>Year</label>
                                <input {...register('year' , {required : 'This field is required.' , pattern : {value : /^\d{4}$/ , message : 'Enter a valid year(e.g. 2007).'}})} className='px-4 py-2 rounded-md inset-shadow-sm inset-shadow-black bg-stone-400 text-black focus:outline-none placeholder:text-black/65' type="text" placeholder='Enter a year (e.g., 2009)'/>
                                {errors.year && <p className='text-red-600'>{errors.year.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full justify-center px-16 max-md:px-6 py-4'>
                    <article className='flex flex-col w-full space-y-4'>
                        <textarea {...register('description' , {required : 'This field is required.' ,minLength : {value : 50 , message : 'Description has to be at least 50 characters long.'}})} className='w-full px-4 py-3 focus:outline-none min-h-75 max-md:h-90 rounded-md inset-shadow-sm font-semibold inset-shadow-black bg-stone-300/80 text-gray-950/50 placeholder:text-gray-900/50'
                            placeholder="With hope in my heart, the adventure begins..."
                        />
                        {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
                        <div className='flex justify-end'>
                            <button type='submit' className='px-4 py-1.5 rounded-md bg-blue-600 text-white font-semibold hover:cursor-pointer'>Submit</button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </form>
  )
}

export default CreatePost
