import clsx from 'clsx';
import type { ReactNode } from 'react';
import { VscInfo, VscWarning } from 'react-icons/vsc';

export type NoteProps = {
	readonly type?: string;
	readonly children: ReactNode;
	readonly variant: 'warning' | 'info';
};

const icons = {
	warning: <VscWarning className="inline text-sm mr-2 select-none" />,
	info: <VscInfo className="inline text-sm mr-2 select-none" />,
};

export function Note(props: NoteProps) {
	const className = clsx('p-4 pt-3 not-prose rounded-md space-y-2 border-[1px]', {
		'bg-yellow-100/90 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-500 border-yellow-500 dark:border-yellow-900/80': props.variant === 'warning',
		'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-500 border-blue-500 dark:border-gray-900/80': props.variant === 'info',
	});

	return (
		<div className={className}>
			<div>
				{icons[props.variant]}
				{props.type && <p className="text-xs inline">{props.type}</p>}
			</div>

			<div className="text-sm">{props.children}</div>
		</div>
	);
}