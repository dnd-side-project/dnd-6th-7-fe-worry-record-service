export const makeBoxShadow = (
	color: string,
	width: number,
	height: number,
	opacity: number,
	radius: number,
	elevation: number,
): string => {
	return `
    shadowColor: ${color},
    shadowOffset: {
      width: ${width},
      height: ${height},
    },
    shadowOpacity: ${opacity},
    shadowRadius:${radius},
    elevation: ${elevation},`;
};
