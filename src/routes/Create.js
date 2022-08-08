import React from 'react';
import { useForm } from 'react-hook-form';

export default function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (

        <div className="container p-5">
            <div className="card text-center w-md-50">
                <div className="card-header">
                    Create Event
                </div>
                <div className="card-body text-start">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-3">
                            <label for="input1" className="form-label">Title *</label>
                            <input id="input1" className="form-control" type="text" placeholder="Add your title" {...register("Title", { required: true, maxLength: 80 })} />
                            {errors.Title?.type === 'required' && <p className='text-danger'>Title is required</p>}
                        </div>

                        <div className="mb-3">
                            <label for="input2" className="form-label">Link</label>
                            <input id="input2" className="form-control" type="text" placeholder="Add any link" {...register("Link",{})} />
                        </div>

                        <div className="mb-3">
                            <label for="input3" className="form-label">Date *</label>

                            <input id="input3" className="form-control" type="datetime-local" placeholder="Add due date and time" {...register("Date", { required: true })} />
                            {errors.Title?.type === 'required' && <p className='text-danger'>Date and Time is required</p>}
                        </div>

                        <div className="mb-3">
                            <label for="input4" className="form-label">Description</label>
                            <textarea id="input4" className="form-control"{...register("Description", {})} />

                        </div>
                        <div className="mb-3">

                            <input type="submit" className="btn btn-primary" />

                        </div>

                    </form>

                </div>
                <div className="card-footer text-muted">
                    Click Submit
                </div>
            </div>

        </div>
    );
}


