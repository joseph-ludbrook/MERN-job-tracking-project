import FormRow from '../components/FormRow';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import SubmitButton from '../components/SubmitButton';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('avatar');
	if (file && file.size > 50000) {
		toast.error('File too large');
		return null;
	}
	try {
		await customFetch.patch(`/user/updateuser`, formData);
		toast.success('profile updated successfully');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
	}
	return null;
};

const ProfilePage = () => {
	const { user } = useOutletContext();
	const { name, lastName, email, location } = user;

	return (
		<Wrapper>
			<Form
				method="post"
				className="form"
				encType="multipart/form-data">
				<h4 className="form-title">Profile</h4>
				<div className="form-center">
					<div className="form-row">
						<label
							htmlFor="avatar"
							className="form-label">
							Select an image (Max 0.5mb)
						</label>
						<input
							type="file"
							id="avatar"
							name="avatar"
							className="form-input"
							accept="image/*"
						/>
					</div>
					<FormRow
						type="text"
						name="name"
						defaultValue={name}
					/>
					<FormRow
						type="text"
						name="lastName"
						labelText="Last Name"
						defaultValue={lastName}
					/>
					<FormRow
						type="text"
						name="email"
						defaultValue={email}
					/>
					<FormRow
						type="text"
						name="location"
						defaultValue={location}
					/>
					<SubmitButton formBtn={true} />
				</div>
			</Form>
		</Wrapper>
	);
};
export default ProfilePage;
