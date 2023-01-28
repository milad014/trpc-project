import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import * as Yup from 'yup'
import { trpc } from '../utils/trpc'
import { useFormik } from 'formik'

export default function CreatePost() {
    const mutation = trpc.createPost.useMutation()

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()

                .max(15, 'Must be 15 characters or less')

                .required('Required'),

            text: Yup.string()

                .min(20, 'Must be 20 characters or more')

                .required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            mutation.mutate({ ...values })
            resetForm()
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col justify-center items-center">
                <h1 className="my-6">Add New Post</h1>
                <div className="flex flex-col gap-4 px-4 min-w-320px md:w-1/2 justify-center items-center h-65   border py-8">
                    <div className="w-full">
                        <input
                            id="title"
                            name="title"
                            className="border px-4 w-full h-12 rounded-md"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur}
                            placeholder="title"
                        />
                        <div className="text-red-700">
                            {formik.touched.title && formik.errors.title ? (
                                <div>{formik.errors.title}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-full">
                        <textarea
                            rows={6}
                            className="w-full border px-4  rounded-md"
                            id="text"
                            onBlur={formik.handleBlur}
                            name="text"
                            onChange={formik.handleChange}
                            value={formik.values.text}
                            placeholder="text"
                        />
                        <div className="text-red-700">
                            {formik.touched.text && formik.errors.text ? (
                                <div>{formik.errors.text}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <button className="bg-red-500 text-white px-12 my-4">
                    {mutation.isLoading ? (
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        'Add post'
                    )}
                </button>
            </div>
            {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
            )}
        </form>
    )
}
