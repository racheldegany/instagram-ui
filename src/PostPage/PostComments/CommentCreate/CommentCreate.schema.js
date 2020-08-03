import * as Yup from 'yup';

export const CommentCreateSchema = Yup.object().shape({
    
    content: Yup.string()
        .required('Write something')
        .max(2000, 'Description is too long')
});