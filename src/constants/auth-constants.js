// 权限
export const AUTHORITY = {
  ADMIN: {
    name: '管理员',
    code: 1
  },
  REVIEW_MANAGER: {
    name: '评审员',
    code: 5
  },
  BUSINESS_MANAGER: {
    name: '统计员',
    code: 10
  },
  STAFF: {
    name: '普通员工',
    code: 15
  }
};

export const getAuthortyNameByCode = roleCode => {
  const auth = Object.values(AUTHORITY).find(item => item.code === roleCode);

  if (auth) {
    return auth.name;
  } else {
    return '';
  }
};
