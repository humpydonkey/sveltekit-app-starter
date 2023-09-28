import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate, message } from 'sveltekit-superforms/server';



// export const actions = {
// 	default: async ({ cookies, request }) => {
// 		// const form = await superValidate(event, profileSchema);
// 		// //console.log(form);

// 		// if (!form.valid) {
// 		// 	return fail(400, {
// 		// 		form
// 		// 	});
// 		// }
//         const formData = await request.formData();
//         let imageData;
// 		try {			
//             let prompt = formData.get("prompt");
//             if (!prompt) {
//                 return fail(400, { prompt: "Prompt is required" });
//             }
//             console.log(`Request model inference with prompt ${prompt}`);
// 			imageData = await callInference(prompt);
// 		} catch (e) {
// 			console.error(e);
// 			// return setError(formData, null, 'There was a problem updating your profile.');
// 		}
// 		console.log('profile updated successfully');
// 		return imageData;
//     }
// };
