export interface WorriesServiceClass {
  http: any;
  getWorries: (userId: any) => any;
  addWorry: (email: any, password: any) => any;
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
  updateWorryExpiredDate: (id: any) => any;
  getWorryReview: (id: any) => any;
  updatePresentWorry: () => any;
  updateWorryReview: () => any;
}

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

  async addWorry(email: any, password: any) {
    return this.http.fetch('/worries/write', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async getRecentWorries(userId: any): Promise<any> {
    return this.http.fetch(`/worries/recent?userId=${userId}`, {
      method: 'GET',
    });
  }

  async filterRecentWorries(queryString: any): Promise<any> {
    return this.http.fetch(`/worries/recent/filter?${queryString}`, {
      method: 'GET',
    });
  }

  async getPastWorries(userId: any): Promise<any> {
    return this.http.fetch(`/worries/past?userId=${userId}`, {
      method: 'GET',
    });
  }

  async filterPastWorries(queryString: any): Promise<any> {
    return this.http.fetch(`/worries/past/filter?${queryString}`, {
      method: 'GET',
    });
  }

  async filterValuablePastWorries(userId: any): Promise<any> {
    return this.http.fetch(`/worries/past/mean?userId=${userId}`, {
      method: 'GET',
    });
  }

  async filterInvaluablePastWorries(userId: any): Promise<any> {
    return this.http.fetch(`/worries/past/meanless?userId=${userId}`, {
      method: 'GET',
    });
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

  async updateWorryExpiredDate(id: any) {
    return this.http.fetch('/worries/review/date', {
      method: 'PUT',
    });
  }

  async getWorryReview(id: any) {
    return this.http.fetch(`/worries/review/${id}`, {
      method: 'GET',
    });
  }

  async updatePresentWorry() {
    return this.http.fetch('/worries/review/realize', {
      method: 'PATCH',
    });
  }

  async updateWorryReview() {
    return this.http.fetch('/worries/review', {
      method: 'PATCH',
    });
  }
}
