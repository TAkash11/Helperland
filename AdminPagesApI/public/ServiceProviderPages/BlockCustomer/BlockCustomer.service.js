"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerService = void 0;
class BlockCustomerService {
    constructor(blockCustomerRepository) {
        this.blockCustomerRepository = blockCustomerRepository;
        this.blockCustomerRepository = blockCustomerRepository;
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.findUser(Email);
        });
    }
    findServiceBySpId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.findServiceBySpId(ServiceProviderId);
        });
    }
    findAllcustIdSpHadWorkedFor(service) {
        const custId = [];
        for (let s in service) {
            if (service[s].Status === 2 && service[s].UserId != null) {
                custId.push(service[s].UserId);
            }
        }
        return custId;
    }
    findAllcustSpHadWorkedFor(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cust = [];
            const service = yield this.blockCustomerRepository.findAllcustSpHadWorkedFor(ServiceProviderId);
            if (service) {
                if (service.length > 0) {
                    for (let s in service) {
                        const user = yield this.blockCustomerRepository.findByUId(service[s].UserId);
                        if (user) {
                            cust.push({
                                UserId: user.UserId,
                                Name: user.FirstName + " " + user.LastName,
                                Email: user.Email,
                                ZipCode: user.ZipCode
                            });
                        }
                    }
                }
            }
            const userId = cust.map(o => o.UserId);
            const users = cust.filter(({ UserId }, index) => !userId.includes(UserId, index + 1));
            return users;
        });
    }
    ;
    findBlockedCust(UserId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.findBlockedCust(UserId, custId);
        });
    }
    updateBlockedCust(blocked) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.updateBlockedCust(blocked);
        });
    }
    createBlockedCust(favorite) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.createBlockedCust(favorite);
        });
    }
}
exports.BlockCustomerService = BlockCustomerService;
