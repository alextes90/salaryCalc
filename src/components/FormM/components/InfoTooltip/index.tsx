import React from 'react';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PPK_DESCRIPTION, PPK_DESCRIPTION2, PPK_MORE_INFO_LINK } from 'appConstants';

const PPK_title = (
  <React.Fragment>
    {PPK_DESCRIPTION}
    <b>YES</b>
    {PPK_DESCRIPTION2}
    <a href={PPK_MORE_INFO_LINK} target="_blank" rel="noreferrer">
      More info
    </a>
  </React.Fragment>
);

type Props = Omit<TooltipProps, 'title' | 'children'> & Partial<Pick<TooltipProps, 'title'>>;

export const InfoTooltip = styled(({ className, title = PPK_title, ...props }: Props) => {
  return (
    <Tooltip {...props} classes={{ popper: className }} placement="right-end" title={title}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 22 22"
        strokeWidth={1.5}
        stroke="#0088fe"
        width="16px"
        className="infoIcon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
  );
})(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    border: '1px solid #dadde9',
  },
}));
