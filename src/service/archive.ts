import { WorryTempProps } from '~/types/Worry';

export interface WorriesServiceClass {
  http: any;
  getWorries: (userId: any) => any;
  addWorry: (worryContents: any) => any;
  getRecentWorries: (userId: any) => any;
  filterRecentWorries: (queryString: any) => any;
  getPastWorries: (userId: any) => any;
  filterPastWorries: (queryString: any) => any;
  filterValuablePastWorries: (userId: any) => any;
  filterInvaluablePastWorries: (userId: any) => any;
  unlockWorry: (worryId: any) => any;
  deleteWorry: (worryId: any) => any;
  getWorryReviewChat: (worryId: any) => any;
  addWorryReview: (email: any, password: any) => any;
  updateWorryExpiredDate: (id: any, expiryDate: any) => any;
  getWorryReview: (id: any) => any;
  updatePresentWorry: (worryId: any, isRealized: any) => any;
  updateWorryReview: (worryId: any, worryReview: any) => any;
}

// isChecked 값 설정하기 위한 함수
const setIsChecked = (data: any) =>
  data.map((item: WorryTempProps) => ({ ...item, isChecked: false }));
export default class WorriesService implements WorriesServiceClass {
  http: any;

  constructor(http: any) {
    this.http = http;
  }

  async getWorries(userId: any): Promise<any> {
    return this.http.fetch(`/worries/home?userId=${userId}`, {
      method: 'GET',
    });
  }

  async addWorry(worryContents: any) {
    return this.http.fetch('/worries/write', {
      method: 'POST',
      body: JSON.stringify({
        ...worryContents,
      }),
    });
  }

  async getRecentWorries(userId: any): Promise<any> {
    const result = await this.http.fetch(`/worries/recent?userId=${userId}`, {
      method: 'GET',
    });
    return setIsChecked(result);
  }

  async filterRecentWorries(queryString: any): Promise<any> {
    const result = await this.http.fetch(
      `/worries/recent/filter?${queryString}`,
      {
        method: 'GET',
      },
    );
    return setIsChecked(result);
  }

  async getPastWorries(userId: any): Promise<any> {
    const result = await this.http.fetch(`/worries/past?userId=${userId}`, {
      method: 'GET',
    });
    return setIsChecked(result);
  }

  async filterPastWorries(queryString: any): Promise<any> {
    const result = await this.http.fetch(
      `/worries/past/filter?${queryString}`,
      {
        method: 'GET',
      },
    );
    return setIsChecked(result);
  }

  async filterValuablePastWorries(userId: any): Promise<any> {
    const result = await this.http.fetch(
      `/worries/past/mean?userId=${userId}`,
      {
        method: 'GET',
      },
    );
    return setIsChecked(result);
  }

  async filterInvaluablePastWorries(userId: any): Promise<any> {
    const result = await this.http.fetch(
      `/worries/past/meanless?userId=${userId}`,
      {
        method: 'GET',
      },
    );
    return setIsChecked(result);
  }

  // async lockWorry(id: any) {
  //   return this.http.fetch(`/worries/${id}`, {
  //     method: 'PATCH',
  //   });
  // }

  async unlockWorry(worryId: any): Promise<any> {
    return this.http.fetch(`/worries/${worryId}`, {
      method: 'PATCH',
    });
  }

  async deleteWorry(worryId: any) {
    return this.http.fetch(`/worries?${worryId}`, {
      method: 'DELETE',
    });
  }

  async getWorryReviewChat(worryId: any) {
    return this.http.fetch(`/worries/chat/${worryId}`, {
      method: 'GET',
    });
  }

  async addWorryReview(queryString: any) {
    return this.http.fetch(`/worries/chat/realize?${queryString}`, {
      method: 'POST',
    });
  }

  async updateWorryExpiredDate(worryId: string, expiryDate: string) {
    return this.http.fetch(
      `/worries/review/date?worryId=${worryId}&expiryDate=${expiryDate}`,
      {
        method: 'PUT',
      },
    );
  }

  async getWorryReview(worryId: any) {
    return this.http.fetch(`/worries/review/${worryId}`, {
      method: 'GET',
    });
  }

  async updatePresentWorry(worryId: any, isRealized: any) {
    return this.http.fetch(
      `/worries/review/realize?worryId=${worryId}&isRealized=${isRealized}`,
      {
        method: 'PATCH',
      },
    );
  }

  async updateWorryReview(worryId: any, worryReview: any) {
    return this.http.fetch('/worries/review', {
      method: 'PATCH',
      body: JSON.stringify({
        worryId,
        worryReview,
      }),
    });
  }
}
