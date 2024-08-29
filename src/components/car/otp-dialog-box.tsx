import { OtpForm } from '../common/otp-form'
import { Dialog, DialogContent } from '../ui/dialog'

type OTPDialogBoxProps = {
	otpOpen: boolean
	closeDialog: () => void
}

export function OTPDialogBox(props: OTPDialogBoxProps) {
	return (
		<Dialog
			open={props.otpOpen}
			onOpenChange={props.closeDialog}>
			<DialogContent className='max-w-[90svw] md:max-w-[78svw] lg:max-w-[60svw]'>
				<OtpForm />
			</DialogContent>
		</Dialog>
	)
}
