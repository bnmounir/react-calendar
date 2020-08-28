import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from './errorMessage';
import './styles.css';

function CreateEventForm() {
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                <h1>Create Event</h1>
                <label>Title:</label>
                <input name='title' ref={register({ required: true })} />
                <ErrorMessage error={errors.title} />
                <label>Range:</label>
                <input
                    name='range'
                    defaultValue='range passed on props'
                    ref={register({ required: true })}
                />
                <ErrorMessage error={errors.range} />
                <label>Color</label>
                <select name='color' ref={register({ required: true })}>
                    <option value=''>Select...</option>
                    <option value='green'>Green</option>
                    <option value='blue'>Blue</option>
                    <option value='red'>Red</option>
                    <option value='yellow'>Yellow</option>
                </select>
                <ErrorMessage error={errors.color} />
                <input disabled={isSubmitting} type='submit' />
            </form>
        </div>
    );
}

export default CreateEventForm;
